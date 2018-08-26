require_relative '../entities/entry_entity'
require_relative '../entities/comment_entity'
require_relative '../../config/constants'
require_relative '../helpers/pagination_helper'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    if signed_in?
      entries = Entry.viewable_by(current_user)
      @comments = Comment.viewable_by(current_user)
    else
      entries = Entry.privacy_public
      @comments = Comment.privacy_public
    end

    @comments = @comments.limit(10)
    @pagination_details = PaginationHelper.pagination_details(entries, params[:page])

    @entries = API::Entities::EntryEntity.represent(@pagination_details.delete(:paginated_query)).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end
end
