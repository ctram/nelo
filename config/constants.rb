module CONSTANTS
  # Should be odd number
  NUM_PAGES = 10
  NUM_PER_PAGE = 1

  def self.num_half_pages
    NUM_PAGES / 2 - 1
  end
end