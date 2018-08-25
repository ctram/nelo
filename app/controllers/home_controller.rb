require_relative '../entities/entry_entity'
require_relative '../entities/comment_entity'
require_relative '../../config/constants'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    current_entry_page = params[:page] ? params[:page].to_i : 1
    
    if signed_in?
      found_entries = Entry.with_user_entries(current_user).reverse_order
      @comments = Comment.with_user_comments(current_user).reverse_order
    else
      found_entries = Entry.privacy_public.reverse_order
      @comments = Comment.privacy_public.reverse_order
    end
    @entries = found_entries.paginate(page: current_entry_page)
    
    @num_entry_pages = (found_entries.length.to_f / CONSTANTS::NUM_PER_PAGE).ceil
    @current_entry_page = current_entry_page
    
    @entry_start_page = @current_entry_page - CONSTANTS.num_half_pages
    @entry_start_page = @entry_start_page < 1 ? 1 : @entry_start_page
    
    @entry_end_page = @current_entry_page + CONSTANTS.num_half_pages
    @entry_end_page = @num_entry_pages - @current_entry_page < CONSTANTS.num_half_pages ? @num_entry_pages - @current_entry_page : @entry_end_page
    @entry_end_page = @entry_end_page < 1 ? 1 : @entry_end_page

    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end
end
