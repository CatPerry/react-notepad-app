import React, {Component} from 'react'
import Note from './note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
  //modify the board to ADD STATE. and instead of rendering ONE of the notes we'll render the notes based on some State data. We'll use the constructor method and call super to do this.
  constructor(props) {
    super(props)
    this.state = {
      //this will render an array of dynamic data the will list the number of notes in our app
      //let's set the notes as an empty array to make it dynamic
      notes: []
    }
    //we have to always bind this
    this.add = this.add.bind(this)
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.nextId = this.nextId.bind(this)
  }

componentWillMount() {
  let self = this
  if (this.props.count){
    fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
    .then(response => response.json())
    .then(json => json[0]
      .split('. ')
      .forEach(sentence => self.add(sentence.substring(0, 25))))
  } 
}

//new I'll create ability to add notes 
add(text) {
  this.setState(prevState => ({
    notes: [
      //use the ES6 spread operator to take all of the note that are in State and push them into a new array then we'll append another note. 
      ...prevState.notes, 
      {
        id: this.nextId(), 
        note: text
      }
    ]
  }));
}

//this function autogenerates an ID for us
nextId() {
  this.uniqueId = this.uniqueId || 0
  return this.uniqueId++
}

//I want to be able to update the note. The state of the note is being held in the Board component. But eahc itme I update it I want to send the new note text from its child, the note component. So we'll use this new method called update.
//And we'll get the next text from the note by adding an onChange state to each of the notes. 
update(newText, i) {
  console.log('updating item at index', i, newText)
  //this callback takes in the previous state
  this.setState(prevState => ({
    notes: prevState.notes.map(
      //this checks: if we're not updating the note, return it as is; otherwise return new object and pass in keys for note, and overwrite text for note key 
      note => (note.id !== i ? note : {...note, note: newText})
    )
  }))
}

remove(id) {
  console.log('removing item at', id)
  //use a callback to pass in the prevState 
  this.setState(prevState => ({
    //.filter resets the state of note and will return an array that will remove the item hwere this is true, where we're removing by that ID. 
    notes: prevState.notes.filter(note => note.id !== id)
  }))
}

//EACH TIME WE UPDATE SEND THE NEW NOTE component to 
//now let's add the notes to the board based on dynamic data above
eachNote(note, i) {
  return (
    <Note key={note.id}
      index={note.id}
      onChange={this.update}
      onRemove={this.remove}>
      {/* this is what's displayed: the value of note above in the key /value pairs under notes */}
      {note.note}
      {/* this ust close out component */}
    </Note>
  )
}

render() {
  return (
    <div className="board">
    {/* this will map over all the notes int eh array that are in STATE and print them to the screen. It does so by calling the eachNote function for every instance of a note*/}
      {this.state.notes.map(this.eachNote)}
      {/* we'll add a button to createa new note and have default text added to it  */}
      <button onClick={this.add.bind(null, "New Note")}           
          id="add">
        <FaPlus/>
      </button>
    </div>
  )
}
}

export default Board