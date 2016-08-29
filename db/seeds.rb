# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest = User.create!(email: "guest_user", password: "password")

notebook1 = Notebook.create!(title: "Sample Notebook", user_id: guest.id)
notebook2 = Notebook.create!(title: "To-Do List", user_id: guest.id)

note1 = Note.create!(
  notebook_id: notebook1.id,
  title: "How to create a note:",
  body: "<ol><li>Type your things.</li><li><i><span style=\"background-color: rgb(153, 51, 255);\"><span style=\"color: rgb(255, 255, 0);\">Style your text  </span></span></i></li><li><span style=\"font-size: 18px;\"><s>Start crossing things off your list</s></span></li></ol>"
)

note2 = Note.create!(
  notebook_id: notebook2.id,
  title: "8/28 to-do's",
  body: "<div><span style=\"font-family: monospace;\">Edit</span><span style=\"font-family: sans-serif;\"> your note in here!s s</span></div>"
)

note3 = Note.create!(
  notebook_id: notebook1.id,
  title: "Flux Cycle",
  body: "<div>Learn more about <a href=\"https://facebook.github.io/flux/docs/overview.html\">flux</a>!</div><div><img src=\"https://res.cloudinary.com/dg2yejdpt/image/upload/v1472462057/flux-diagram-white-background_dfpasw.png\"></div>"
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

note1.tags << tag1
note2.tags << tag2
note2.tags << tag3
note3.tags << tag1
