require_relative '../entities/entry_entity'
require_relative '../entities/user_entity'

class EntriesController < ApplicationController
  def index
    user = User.find(params[:user_id])
    if current_user == user
      @entries = user.entries.reverse_order
    else 
      @entries = user.entries.privacy_public.reverse_order
    end
    
    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @user = API::Entities::UserEntity.represent(user).as_json
  end
  
  def new
    @entry = Entry.new(author_id: current_user.id)
  end
  
  def show
    @entry = Entry.find(params[:id])
  end

  def edit
    @entry = Entry.find(params[:id])
  end

  def create
    current_user.entries.create!(entry_params)
    redirect_to user_entries_path
  end

  def update
    @entry = Entry.find(params[:id])
    @entry.update(entry_params)
    redirect_to entries_path
  end

  def destroy
    Entry.find(params[:id]).destroy
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title, :privacy_level)
  end
  
end
