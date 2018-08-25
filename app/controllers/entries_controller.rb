require_relative '../entities/entry_entity'
require_relative '../entities/user_entity'

class EntriesController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, except: [:index, :show]
  
  def index
    user = User.find(params[:user_id])

    if current_user == user
      @entries = current_user.entries.reverse_order
      @messages = current_user.messages.reverse_order
    elsif signed_in?
      @entries = user.viewable_entries_for(current_user).reverse_order
      @messages = user.viewable_messages_for(current_user).reverse_order
    else
      @entries = user.entries.privacy_public.reverse_order
      @messages = user.messages.privacy_public.reverse_order
    end
    
    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @messages = API::Entities::MessageEntity.represent(@messages).as_json
    @user = API::Entities::UserEntity.represent(user).as_json
  end
  
  def new
    @entry = Entry.new(author_id: current_user.id)
  end
  
  def show
    @entry = Entry.find(params[:id])
    can? :read, @entry
  end

  def edit
    @entry = Entry.find(params[:id])
    can? :edit, @entry
  end

  def create
    current_user.entries.create!(entry_params)
    redirect_to user_entries_path
  end

  def update
    entry = Entry.find(params[:id])
    can? :update, @entry
    entry.update(entry_params)
    redirect_to entries_path
  end

  def destroy
    entry = Entry.find(params[:id])
    can? :destroy, entry
    entry.destroy
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title, :privacy_level)
  end
  
end
