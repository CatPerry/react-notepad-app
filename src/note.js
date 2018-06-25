import React, {Component} from 'react'
// import icons. You can use these as component
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'


class Note extends Component {
  //the BIND function makes all of the "this instances" of methods below to make them bound to the constructor to make sure they're bound to THIS
    constructor(props) {
      super(props)
      //adding an editing state to the constructor, so we can change other things based on that
      this.state = {
        editing: false
      }
      //this.edit refers to the methods added below. It's not arbitrary.
      this.edit = this.edit.bind(this)
      this.remove = this.remove.bind(this)
      this.save = this.save.bind(this)
      this.renderForm = this.renderForm.bind(this)
      this.renderDisplay = this.renderDisplay.bind(this)
      this.randomBetween = this.randomBetween.bind(this)
    }

componentWillMount() {
  this.style = {
    right: this.randomBetween(0, document.innerWidth - 150, 'px'),
    top: this.randomBetween(0, document.innerHeight - 150, 'px'),
    transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
  }
}

randomBetween(x, y, s) {
  return x + Math.ceil(Math.random() * (y-x)) + s
}

componentDidUpdate() {
  var textArea
  if (this.state.editing) {
    textArea = this._newText
    textArea.focus()
    textArea.select()
  }
}

shouldComponentUpdate(nextProps, nextState) {
  return (
    this.props.children !== nextProps.children || this.state !== nextState
  )
}

//let' viewers know they are editing/removing the text
edit() {
  this.setState({
    editing: true
  })
}
remove() {
  this.props.onRemove(this.props.index)
}
//handle the Save State
save(e) {
  e.preventDefault();
  //this refers to update in the the board.js file
  //and we'll pass the in the ref form renderForm below: this._newText.value
  this.props.onChange(this._newText.value, this.props.index);
  //then set state back to false
  this.setState({ editing: false });
        }

//Now we need a few functions that handle creating a form
renderForm() {
  return (
    <div className="note" style={this.style}>
      <form onSubmit={this.save}>
        {/* added a REF below to to capture the input into the text area. We are using a CALLBACK function for it. Then we, the the save method above use this.new_text.value to capture the value*/}
        <textarea ref={input => this._newText = input}
          defaultValue={this.props.children}/>
        <button id="save"><FaFloppyO/></button>
      </form>
    </div>
  )
}
  //changed this to renderDisplay funciton since it's rendering display
  renderDisplay() {
    return <div className="note" style={this.style}>
        {/* this will display any child elements of it (i.e., whatever the value of Note/each Note is on the board.js file) */}
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit} id="edit">
            <FaPencil />
          </button>
          <button onClick={this.remove} id="remove">
            <FaTrash />
          </button>
        </span>
      </div>;
  }
  //always need a final render method that will append items to the DOM given their state. and let's use th ternary syntax to check all states at once.
  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay()
  }
    
}

export default Note