require 'byebug'

class User < ApplicationRecord
  attr_reader :password

	validates :email, :password_digest, :session_token, presence: true
	validates :email, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

  has_many :notebooks
  has_many :tags

  has_many :notes,
    through: :notebooks,
    source: :notes

	def password=(password)
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private
	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end

  public
  def reset_guest_account
    self.notebooks.destroy_all
    self.tags.destroy_all
  end

  def setup_new_account
    notebook = Notebook.create!(title: "Welcome Notebook", user_id: self.id)
    notebook1 = Notebook.create!(title: "Sample Notebook", user_id: self.id)
    notebook2 = Notebook.create!(title: "To-Do List", user_id: self.id)

    note = Note.create!(
      notebook_id: notebook.id,
      title: "Welcome to Quicknote!",
      body: "<div><span style=\"font-family: serif;\"><span style=\"font-size: 18px;\">Create to-do lists, track receipts, save pictures - the possibilities are endless!</span></span></div><div><br></div><div><br></div>"
    )

    note1 = Note.create!(
      notebook_id: notebook1.id,
      title: "How to create a note:",
      body: "<ol><li>Type your content.</li><li><i><span style=\"background-color: rgb(153, 51, 255);\"><span style=\"color: rgb(255, 255, 0);\">Style your text  </span></span></i></li><li><span style=\"font-size: 18px;\"><s>Start crossing things off your list</s></span></li></ol>"
    )

    note2 = Note.create!(
      notebook_id: notebook2.id,
      title: "Today's to-do's",
      body: "<div><span style=\"font-family: monospace;\">Edit</span><span style=\"font-family: sans-serif;\"> your note in here!</span></div>"
    )

    note3 = Note.create!(
      notebook_id: notebook1.id,
      title: "Flux Cycle",
      body: "<div>Learn more about <a href=\"https://facebook.github.io/flux/docs/overview.html\">flux</a>!</div><div><img src=\"https://res.cloudinary.com/dg2yejdpt/image/upload/v1472462057/flux-diagram-white-background_dfpasw.png\"></div>"
    )
    debugger

    note4 = Note.create!(
      notebook_id: notebook2.id,
      title: "Try deleting this note...",
      body: "<div>hover over this note in the bar to the left and click the trash can icon</div>"
    )

    note5 = Note.create!(
      notebook_id: notebook2.id,
      title: "Add a tag to this note!",
      body: "<div>at the top of the note editor above, type a tag name into the 'New tag' box and press [enter] to create a tag!</div>"
    )

    note6 = Note.create!(
      notebook_id: notebook2.id,
      title: "Create a new notebook and move this note to it",
      body: "<ol><li><span style=\"color: rgb(0, 102, 204);\">Click the notebooks icon on the left navigation bar to bring up the notebooks screen. </span></li><li><span style=\"color: rgb(255, 153, 0);\">Then click the \"add notebook\" icon and type in a title.</span></li><li><span style=\"color: rgb(102, 185, 102);\">Navigate back to this note then click the notebook dropdown menu at the top of the note editor.</span></li><li><span style=\"background-color: rgb(255, 255, 0);\"><i><span style=\"font-family: monospace;\">Select your new notebook!</span></i></span></li></ol>"
    )

    note7 = Note.create!(
      notebook_id: notebook.id,
      title: "Jot down ideas",
      body: "<div>on paper and take a picture!</div><div><img width=\"425\" height=\"282\" src=\"https://res.cloudinary.com/dg2yejdpt/image/upload/v1476924956/To-Do-List_67436-300x167_w7pnhl.jpg\" class=\"attachment-full size-full wp-post-image\" alt=\"free-office-move-checklist\" title=\"\"></div><div><br></div><ol><li><span style=\"color: rgb(0, 102, 204);\"><b><i>Or</i></b></span></li><li><span style=\"color: rgb(0, 102, 204);\"><b><i>Create a checklist inside a note just like this!</i></b></span></li></ol>"
    )

    tag1 = Tag.create!(
      title: "to-do",
      user_id: self.id
    )

    tag2 = Tag.create!(
      title: "sample-tag",
      user_id: self.id
    )

    tag3 = Tag.create!(
      title: "Grocery",
      user_id: self.id
    )

    tag4 = Tag.create!(
      title: "welcome",
      user_id: self.id
    )

    note1.tags << tag1
    note2.tags << tag2
    note2.tags << tag3
    note3.tags << tag1
    note4.tags << tag1
    note5.tags << tag1
    note6.tags << tag1
    note7.tags << tag4
    note.tags << tag4
  end
end
