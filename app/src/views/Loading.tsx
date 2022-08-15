import { Spin } from "@douyinfe/semi-ui";
import { SpinSize } from "@douyinfe/semi-ui/lib/es/spin";

type Props = {
    size?: SpinSize;
}

const Loading = ({ size }: Props) => {
    return (
        <Spin size={size} />
    )
}

export default Loading;