class EntriesController < ApplicationController
  def index
    @entries = Entry.where(user_id: current_user.id)
    @react_bundle = 'entries-bundle'
  end
  
  def new
    @entry = Entry.new(user_id: current_user.id)
    @react_bundle = 'entry-form-bundle'
  end
  
  def show
    @entry = Entry.find(params[:id])
    @entry
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title)
  end
  
end
