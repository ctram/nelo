module PaginationHelper
  def self.pagination_details(initial_query, page)
    page = 1 if page.nil?
    page = page.to_i
    page = page < 1 ? 1 : page
    
    paginated_query = initial_query.paginate(page: page)

    num_pages = initial_query.length < CONSTANTS::NUM_PER_PAGE ? 1 : (initial_query.length.to_f / CONSTANTS::NUM_PER_PAGE).ceil
    
    start_page = page - CONSTANTS::NUM_PAGES / 2
    start_page = start_page < 1 ? 1 : start_page
    
    end_page = start_page + CONSTANTS::NUM_PAGES
    end_page = end_page > num_pages ? num_pages : end_page

    {
      num_pages: num_pages,
      start_page: start_page,
      end_page: end_page,
      paginated_query: paginated_query
    }
  end
end
