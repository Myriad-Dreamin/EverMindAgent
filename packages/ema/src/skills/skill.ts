import { md } from "../utils";

const abc = "xxx";

const skill = md`
## 你是

测试 ${abc}

_Test_
`;

console.log("skill", skill);
