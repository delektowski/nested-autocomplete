import React from "react";
import "./sliderStyles.css";

class Slider extends React.Component {
  render() {
    const offsetWidthValue = this.refs.offsetWidth;
    const is4items = this.props.itemsNumber > 3;
    return (
      <div
        className="slider-container"
        ref={(el) => {
          this.refs = el;
        }}
      >
        <div className="slider-wrapper">{this.props.children}</div>
        <div
          className={["btn", "prev", !is4items && "disable"].join(" ")}
          onClick={() => {
            this.refs.scrollLeft -= offsetWidthValue / 2;
          }}
        >
          {"<"}
        </div>
        <div
          className={["btn", "next", !is4items && "disable"].join(" ")}
          onClick={() => {
            this.refs.scrollLeft += offsetWidthValue / 2;
          }}
        >
          {">"}
        </div>
      </div>
    );
  }
}

class SliderParent extends React.Component {
  render() {
    return (
      <div className="parent">
        <Slider
          ref={(el) => {
            this.refs = el;
          }}
          refValue={this.refs}
          itemsNumber={this.props.itemsNumber}
        >
          {this.props.children &&
            this.props.children.map((value) => {
              return (
                <div key={value.key} className="child">
                  {value}
                </div>
              );
            })}
        </Slider>
      </div>
    );
  }
}

export default SliderParent;
