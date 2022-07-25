import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import React from "react";

const cssContainer = {
  padding: ".5em",
  border: "1px solid #e1e1e1",
  borderRadius: "4px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
};

const cssTagsList = {};

const cssTag = {
  marginRight: ".25em"
};

const cssTagFound = {
  color: "red"
};

const cssTagSelected = {
  background: "blue",
  color: "white"
};

const cssTagInput = {
  border: 0,
  padding: ".5em",
  minWidth: "100px",
  borderRadius: "4px"
};

export default class TagsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.parseTags(this.props.tags),
      tag: ""
    };
  }

  parseTags = text => {
    return (text || "").split(",");
  };

  onChangeInput = tag => {
    const validTag = tag
      .replace(/([^\w-\s]+)|(^\s+)/g, "")
      .replace(/\s+/g, "-");

    this.setState({ tag: validTag });
  };

  handleChange = tags => {
    this.setState({ tags });
    this.props.setStateOfTags(tags);
  };

  REGEXP = /^[\w-]+$/;

  onPaste = value => {
    const result = value
      .replace(/[^\w,;\s]+/g, ",")
      .replace(/\s+/g, "-")
      .replace(/[,;]{2,}/g, ",");
    return result.split(/,+/);
  };

  render() {
    const { tags, tag } = this.state;

    return (
      <TagsInput
        value={tags}
        onChange={this.handleChange}
        inputValue={tag}
        onChangeInput={this.onChangeInput}
        validationRegex={this.REGEXP}
        onlyUnique
        maxTags={10}
        addOnBlur
        addOnPaste
        pasteSplit={this.onPaste}
      />
    );
  }
}