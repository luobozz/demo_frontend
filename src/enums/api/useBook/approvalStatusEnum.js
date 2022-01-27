import Enum from "@/enums/enums";

/**
 * @author chenlingyu
 */
export default new Enum()
    .add('PASS', {name: "审批通过", color: "green"}, '0')
    .add('WAIT', {name: "等待审批", color: "blue"}, '1')
    .add('REFUSE', {name: "审批拒绝", color: "red"}, '2')