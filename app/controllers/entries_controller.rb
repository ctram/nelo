require_relative '../entities/entry_entity'
require_relative '../entities/user_entity'

class EntriesController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, except: [:index, :show]
  
  def index
    user = User.find(params[:user_id])
    current_entry_page = params[:current_entry_page] || 1
    comment_page_num = params[:comment_page_num] || 1

    if current_user == user
      @entries = current_user.entries.reverse_order
      @comments = current_user.comments.reverse_order
    elsif signed_in?
      @entries = user.viewable_entries_for(current_user).reverse_order
      @comments = user.viewable_comments_for(current_user).reverse_order
    else
      @entries = user.entries.privacy_public.reverse_order
      @comments = user.comments.privacy_public.reverse_order
    end

    @entries = @entries.paginate(page: current_entry_page)
    @comments = @comments.paginate(page: comment_page_num)

    @num_entry_pages = (@entries.length / 10) + 1
    @num_comment_pages = (@comments.length / 10) + 1
    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
    @user = API::Entities::UserEntity.represent(user).as_json
  end
  
  def new
    @entry = Entry.new(author_id: current_user.id)
  end
  
  def show
    @entry = Entry.find(params[:id])
    can? :read, @entry
    @comments = @entry.comments
    @entry = API::Entities::EntryEntity.represent(@entry).as_json
  end

  def edit
    @entry = API::Entities::EntryEntity.represent(Entry.find(params[:id])).as_json
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
    redirect_to user_entries_path(entry.author)
  end

  def destroy
    entry = Entry.find(params[:id])
    can? :destroy, entry
    entry.destroy
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title, :privacy_level, :current_entry_page, :comment_page_num)
  end
  
end
