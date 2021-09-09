import React, { Component, ReactNode } from "react";
import { Display } from "../components/Display/Display";
import { Col, Row } from "antd";
import {
  FunctionKey,
  NormalKey,
  OperatorKey,
} from "../components/Keypress/Keypress";
import styles from "./App.module.css";

declare interface Key {
  id: string;
  text?: string;
  col?: number;
  type?: string;

  func?(): void;
}

const functionNode = "function";
const operatorNode = "operator";
const normalNode = "normal";

const keyNodeMap: Map<string, ReactNode> = new Map();
keyNodeMap.set("function", FunctionKey);
keyNodeMap.set("normal", NormalKey);
keyNodeMap.set("operator", OperatorKey);

export class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: null,
      canBack: false,
      operator: null,
      expression: "",
    };
  }

  reset = () => {
    const state = {
      value: null,
      canBack: false,
      operator: null,
      expression: "",
    };
    this.setState(state);
  };

  constructRow = (cols: Key[], key: any) => {
    return (
      <Row key={key} className={styles.calcRow}>
        {cols.map((key) => this.constructGrid(key))}
      </Row>
    );
  };

  constructGrid = (key: Key) => {
    let singleSpan = 6;
    return (
      <Col
        span={!key.col ? singleSpan : key.col * singleSpan}
        key={key.id}
        className={styles.calcCol}
      >
        {this.constructKey(key)}
      </Col>
    );
  };
  constructKey = (key: Key) => {
    let node;
    const content = key.text || "";
    const prop = {
      id: key.id,
      content,
      onClick: this.handleKeypressClick,
    };
    switch (key.type) {
      case "function":
        node = <FunctionKey {...prop} />;
        break;
      case "operator":
        node = <OperatorKey {...prop} />;
        break;
      case "normal":
      default:
        node = <NormalKey {...prop} />;
    }

    return node;
  };

  result = () => {
    const value = this.calculate(this.state.expression);
    this.setState({
      value,
    });
  };

  calculate: any = (expression: string) => {
    let plusIndex = expression.indexOf("+");
    if (plusIndex > -1) {
      return (
        this.calculate(expression.substring(0, plusIndex)) +
        this.calculate(expression.substring(plusIndex + 1))
      );
    }
    let minusIndex = expression.indexOf("-");
    if (minusIndex > -1) {
      return (
        this.calculate(expression.substring(0, minusIndex)) -
        this.calculate(expression.substring(minusIndex + 1))
      );
    }
    let multiplyIndex = expression.indexOf("×");
    if (multiplyIndex > -1) {
      return (
        this.calculate(expression.substring(0, multiplyIndex)) *
        this.calculate(expression.substring(multiplyIndex + 1))
      );
    }
    let reminderIndex = expression.indexOf("%");
    if (reminderIndex > -1) {
      return (
        this.calculate(expression.substring(0, reminderIndex)) %
        this.calculate(expression.substring(reminderIndex + 1))
      );
    }
    let divideIndex = expression.indexOf("÷");
    if (divideIndex > -1) {
      return (
        this.calculate(expression.substring(0, divideIndex)) /
        this.calculate(expression.substring(divideIndex + 1))
      );
    }
    return parseFloat(expression);
  };

  valueAppend = (value: string | number) => {
    this.setState((state: any) => {
      let v = state.operator ? value : state.value + value;
      let expression = state.expression + value;
      return {
        expression,
        value: v.toString(),
        canBack: true,
        operator: null,
      };
    });
  };
  operate = (operator: string) => {
    this.setState((state: any) => {
      if (!state.operator) {
        return {
          operator,
          canBack: false,
          expression: state.expression + operator,
        };
      }
    });
  };

  render() {
    return (
      <div className={styles.calculator}>
        <div className={styles.calcDisplay}>
          <Display value={this.state.value || 0} />
        </div>
        <div className={styles.calcKeyboard}>
          {this.structure.map((cols, index) => this.constructRow(cols, index))}
        </div>
      </div>
    );
  }
  structure: Key[][] = [
    [
      {
        id: "AC",
        text: "AC",
        type: functionNode,
        func: this.reset,
      },
      {
        id: "+/-",
        text: "+/-",
        type: functionNode,
      },
      {
        id: "%",
        text: "%",
        type: functionNode,
        func: () => this.operate("%"),
      },
      {
        id: "÷",
        text: "÷",
        type: operatorNode,
        func: () => this.operate("÷"),
      },
    ],
    [
      {
        id: "7",
        text: "7",
        func: () => this.valueAppend(7),
      },
      {
        id: "8",
        text: "8",
        func: () => this.valueAppend(8),
      },
      {
        id: "9",
        text: "9",
        func: () => this.valueAppend(9),
      },
      {
        id: "×",
        text: "×",
        type: operatorNode,
        func: () => this.operate("×"),
      },
    ],
    [
      {
        id: "4",
        text: "4",
        func: () => this.valueAppend(4),
      },
      {
        id: "5",
        text: "5",
        func: () => this.valueAppend(5),
      },
      {
        id: "6",
        text: "6",
        func: () => this.valueAppend(6),
      },
      {
        id: "-",
        text: "-",
        type: operatorNode,
        func: () => this.operate("-"),
      },
    ],
    [
      {
        id: "1",
        text: "1",
        func: () => this.valueAppend(1),
      },
      {
        id: "2",
        text: "2",
        func: () => this.valueAppend(2),
      },
      {
        id: "3",
        text: "3",
        func: () => this.valueAppend(3),
      },
      {
        id: "+",
        text: "+",
        type: operatorNode,
        func: () => this.operate("+"),
      },
    ],
    [
      {
        id: "0",
        text: "0",
        col: 2,
        func: () => this.valueAppend(0),
      },
      {
        id: ".",
        text: ".",
        func: () => this.valueAppend("."),
      },
      {
        id: "=",
        text: "=",
        type: operatorNode,
        func: () => this.result(),
      },
    ],
  ];

  allKey: Map<string, Key> = new Map(
    this.structure.flat(Infinity).map((value: any) => {
      return [value.id, value];
    })
  );

  handleKeypressClick = (key: string, action: string) => {
    const obj: Key | undefined = this.allKey.get(key);
    if (obj && obj.func) {
      obj.func();
    }
  };
}
