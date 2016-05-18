import React from 'react';

class Languages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: this.props.language === 'ru' ? 'ru' : 'en'
    };
  }
  setLanguage(language) {
    this.setState({
      language: language
    });
  }
  render() {
    return (
      <div className="languages">
        <a href="#"
          data-lang="ru"
          className={this.state.language === 'ru' ? 'languages-selected header_button' : 'header_button'}
          onClick={this.props.requestLanguage}
        >
          Рус
        </a>
        <a href="#"
          data-lang="en"
          className={this.state.language === 'en' ? 'languages-selected header_button' : 'header_button'}
          onClick={this.props.requestLanguage}
        >
          Eng
        </a>
      </div>
    );
  }
};

export default Languages;