require_relative '../entities/entry_entity'
require_relative '../entities/comment_entity'
require_relative '../../config/constants'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    @current_entry_page = params[:page] ? params[:page].to_i : 1
    
    if signed_in?
      found_entries = Entry.with_user_entries(current_user)
      @comments = Comment.with_user_comments(current_user)
    else
      found_entries = Entry.privacy_public
      @comments = Comment.privacy_public
    end

    @entries = found_entries.reverse_order.paginate(page: @current_entry_page)

    @num_entry_pages = found_entries.length < CONSTANTS::NUM_PER_PAGE ? 1 : (found_entries.length.to_f / CONSTANTS::NUM_PER_PAGE).ceil
    
    @entry_start_page = @current_entry_page - CONSTANTS::NUM_PAGES / 2
    @entry_start_page = @entry_start_page < 1 ? 1 : @entry_start_page
    
    @entry_end_page = @entry_start_page + CONSTANTS::NUM_PAGES
    @entry_end_page = @entry_end_page > @num_entry_pages ? @num_entry_pages : @entry_end_page

    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end
end
