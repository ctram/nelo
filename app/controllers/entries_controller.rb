require_relative '../entities/entry_entity'
require_relative '../entities/user_entity'
require_relative '../entities/comment_entity'
require_relative '../helpers/pagination_helper'

class EntriesController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, only: [:index, :show]
  
  def index
    user = User.find(params[:user_id])
    
    if current_user == user
      entries = current_user.entries.reverse_order
      comments = current_user.comments.reverse_order
    elsif signed_in?
      entries = Entry.viewable_by(current_user).reverse_order
      comments = Comment.viewable_by(current_user).reverse_order
    else
      entries = Entry.privacy_public.reverse_order
      comments = Comment.privacy_public.reverse_order
    end
    
    entries_pagination = PaginationHelper.pagination_details(entries, params[:entry_page])
    comments_pagination = PaginationHelper.pagination_details(comments, params[:comment_page])

    @entries = API::Entities::EntryEntity.represent(entries_pagination.delete(:paginated_query)).as_json
    
    @comments = API::Entities::CommentEntity.represent(comments_pagination.delete(:paginated_query)).as_json
    
    @pagination_details = {
      entries_pagination: entries_pagination, comments_pagination: comments_pagination
    }
    
    @user = API::Entities::UserEntity.represent(user).as_json
  end
  
  def new
    @entry = Entry.new(author_id: current_user.id)
  end
  
  def show
    @entry = Entry.find(params[:id])

    if current_user
      @comments = @entry.comments.viewable_by(current_user)
    else
      @comments = @entry.comments.privacy_public
    end
    
    @comments = API::Entities::CommentEntity.represent(@comments.reverse_order).as_json
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
    params.require(:entry).permit(:content, :title, :privacy_level, :entry_page, :comment_page)
  end
  
end
