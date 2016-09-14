# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest = User.create!(email: "guest_user", password: "password")

notebook = Notebook.create!(title: "Welcome Notebook", user_id: guest.id)
notebook1 = Notebook.create!(title: "Sample Notebook", user_id: guest.id)
notebook2 = Notebook.create!(title: "To-Do List", user_id: guest.id)

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
  body: "<div>on paper and take a picture!</div><div><img width=\"425\" height=\"282\" src=\"https://res.cloudinary.com/dg2yejdpt/image/upload/v1473664061/free-office-move-checklist_eqbtki.bmp\" class=\"attachment-full size-full wp-post-image\" alt=\"free-office-move-checklist\" title=\"\"></div><div><br></div><ol><li><span style=\"color: rgb(0, 102, 204);\"><b><i>Or</i></b></span></li><li><span style=\"color: rgb(0, 102, 204);\"><b><i>Create a checklist inside a note just like this!</i></b></span></li></ol>"
)

tag1 = Tag.create!(
  title: "to-do",
  user_id: guest.id
)

tag2 = Tag.create!(
  title: "sample-tag",
  user_id: guest.id
)

tag3 = Tag.create!(
  title: "Grocery",
  user_id: guest.id
)

tag4 = Tag.create!(
  title: "welcome",
  user_id: guest.id
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
