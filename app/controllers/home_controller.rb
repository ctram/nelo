require_relative '../entities/entry_entity'
require_relative '../entities/comment_entity'
require_relative '../../config/constants'
require_relative '../helpers/pagination_helper'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    if signed_in?
      entries = Entry.with_user_entries(current_user)
      @comments = Comment.with_user_comments(current_user)
    else
      entries = Entry.privacy_public
      @comments = Comment.privacy_public
    end
    
    pagination_details = PaginationHelper.pagination_details(entries, params[:page])
    
    @entries = pagination_details[:paginated_query]
    @num_entry_pages = pagination_details[:num_pages]
    @entry_start_page = pagination_details[:start_page]
    @entry_end_page = pagination_details[:end_page]

    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end
end
