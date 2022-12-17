import React, { Component, Fragment } from 'react';
import Modal from 'react-modal2';
import './App.css';

class App extends Component {
  static getRandomArray = () => {
    const randomArray = [];

    while (randomArray.length < 27) {
      const randomNumber = Math.round(Math.random() * 89 + 10);
      if (!randomArray.includes(randomNumber)) {
        randomArray.push(randomNumber);
      }
    }

    for (let i = 0; i < 27; i +=1) {
      const randomNumber1 = Math.round(Math.random() * 26);
      const randomNumber2 = Math.round(Math.random() * 26);
      const temp = randomArray[randomNumber1];
      randomArray[randomNumber1] = randomArray[randomNumber2];
      randomArray[randomNumber2] = temp;
    }

    return randomArray;
  };

  constructor(props) {
    super(props);

    const randomArray = App.getRandomArray();

    this.state = {
      shouldDisplayModal: false,
      count: 0,
      randomArray
    }
  }

  reset = () => {
    const randomArray = App.getRandomArray();
    this.setState({
      count: 0,
      randomArray
    });
  };

  openModal = () => {
    this.setState({
      shouldDisplayModal: true
    });

    if (this.state.count !== 0) {
      this.reset();
    }
  };

  closeModal = () => {
    this.setState({
      shouldDisplayModal: false
    });
  };

  onClickCol = selectedCol => {
    const colsInArray = {
      col1: [],
      col2: [],
      col3: []
    };

    for (let i = 0; i < 27; i += 1) {
      if (i < 9) {
        colsInArray.col1[i] = this.state.randomArray[i];
      } else if (i < 18) {
        colsInArray.col2[i - 9] = this.state.randomArray[i];
      } else {
        colsInArray.col3[i - 18] = this.state.randomArray[i];
      }
    }

    const randomArray = [];
    let index = 0;
    let colNumber = selectedCol;
    let priorityColDone = false;
    let done = false;

    for (let i = 0; i < 3; i += 1) {
      if (priorityColDone) {
        colNumber += colNumber + 1 === selectedCol ? 2 : 1;
        colNumber = colNumber > 3 ? 1 : colNumber;
      }

      for (let j = 0; j < 9; j += 1) {
        randomArray[index] = colsInArray[`col${colNumber}`][j];
        if (index === 26) {
          done = true;
          break;
        }
        index = index + 9 >= 27 ? index - 17 : index + 9;
      }

      priorityColDone = true;

      if (done) {
        break;
      }
    }

    const count = this.state.count + 1;

    this.setState({
      randomArray, count
    })
  };

  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src="https://scontent.fdgt1-1.fna.fbcdn.net/v/t1.18169-9/14463294_422201171237416_4672170457109378300_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH_qKJRJf0tbHGC61SGsTvxvWFgRLy02929YWBEvLTb3R1Z3yFVdrFUIvYm6odhW9A9TtZ8dQfkQ9IpM-yhH2qv&_nc_ohc=nV4E4v_zj-IAX_m6sHC&_nc_ht=scontent.fdgt1-1.fna&oh=00_AfBo1fhSME-Yp1BmOmQvwC_jVu4KgyWtt_sRpFYdDZUiyQ&oe=63C4AACB"></img>
            <h1 className="App-title"><span className="lower">Welcome to  </span><br/>Mind Reader Game</h1>
            <p><b>How to Play:</b></p>
            <p> →   There's a total of 27 numbers given.</p>
            <p> →   Choose one of the numbers given using your mind ONLY. </p>
            <p> →   Then select the column of your chosen number and repeat it three times.</p>
            <button type="button" onClick={this.openModal}><b>Start</b></button>
          </header>
        </div>
        {this.state.shouldDisplayModal && <Modal
          onClose={this.closeModal}
          closeOnEsc={false}
          closeOnBackdropClick={false}
          backdropClassName="modalbg"
          modalClassName="modal"
        >
          <div className="close" onClick={this.closeModal}>X</div>
          {this.state.count < 3 && (<div className="container">
            <div className="col1" onClick={() => this.onClickCol(1)}>
              <div className="cell">{this.state.randomArray[0]}</div>
              <div className="cell">{this.state.randomArray[1]}</div>
              <div className="cell">{this.state.randomArray[2]}</div>
              <div className="cell">{this.state.randomArray[3]}</div>
              <div className="cell">{this.state.randomArray[4]}</div>
              <div className="cell">{this.state.randomArray[5]}</div>
              <div className="cell">{this.state.randomArray[6]}</div>
              <div className="cell">{this.state.randomArray[7]}</div>
              <div className="cell">{this.state.randomArray[8]}</div>
            </div>
            <div className="col2" onClick={() => this.onClickCol(2)}>
              <div className="cell">{this.state.randomArray[9]}</div>
              <div className="cell">{this.state.randomArray[10]}</div>
              <div className="cell">{this.state.randomArray[11]}</div>
              <div className="cell">{this.state.randomArray[12]}</div>
              <div className="cell">{this.state.randomArray[13]}</div>
              <div className="cell">{this.state.randomArray[14]}</div>
              <div className="cell">{this.state.randomArray[15]}</div>
              <div className="cell">{this.state.randomArray[16]}</div>
              <div className="cell">{this.state.randomArray[17]}</div>
            </div>
            <div className="col3" onClick={() => this.onClickCol(3)}>
              <div className="cell">{this.state.randomArray[18]}</div>
              <div className="cell">{this.state.randomArray[19]}</div>
              <div className="cell">{this.state.randomArray[20]}</div>
              <div className="cell">{this.state.randomArray[21]}</div>
              <div className="cell">{this.state.randomArray[22]}</div>
              <div className="cell">{this.state.randomArray[23]}</div>
              <div className="cell">{this.state.randomArray[24]}</div>
              <div className="cell">{this.state.randomArray[25]}</div>
              <div className="cell">{this.state.randomArray[26]}</div>
            </div>
          </div>)}
          <div className="footer">
            {this.state.count === 3 && <div className="result">{`The number in your mind is ${this.state.randomArray[0]}`}</div>}
            {this.state.count < 3 && (
              <Fragment>
                <button type="button" onClick={this.closeModal}>Quit</button>
                <button type="button" onClick={this.reset}>Reset</button>
              </Fragment>
            )}
            {this.state.count === 3 && (
              <Fragment>
                <button type="button" onClick={this.closeModal}>Close</button>
                <button type="button" onClick={this.reset}>Play again</button>
              </Fragment>
            )}
          </div>
        </Modal>}
      </Fragment>
    );
  }
}

export default App;
