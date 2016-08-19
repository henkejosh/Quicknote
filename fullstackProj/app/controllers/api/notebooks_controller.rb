class Api::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.all
    render json: @notebooks
  end

  def new
    @notebook = Notebook.new
    render json: @notebook
  end

  def show
    @notebook = Notebook.find(params[:id])
    render json: @notebook
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy!
    render :index
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    @notebook.update_attributes!(notebook_params)

    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors, status: 422
    end
  end

  private
	def notebook_params
		params.require(:notebook).permit(:title, :user_id)
	end
end
