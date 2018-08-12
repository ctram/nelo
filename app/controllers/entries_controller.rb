class EntriesController < ApplicationController
  def index
    puts "index called"
    @entries = Entry.where(user_id: current_user.id)
    @react_bundle = 'entries-bundle'
  end
  
  def new
    puts "new called"
    @entry = Entry.new(user_id: current_user.id)
    @react_bundle = 'entry-form-bundle'
  end
  
  def show
    @entry = Entry.find(params[:id])
  end

  def create
    current_user.entries.create(entry_params)
    redirect_to entries_path
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title)
  end
  
end
