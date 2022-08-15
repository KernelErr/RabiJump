import { Component, ReactNode } from 'react';

type Props = {
    children: React.ReactNode;
};

type Err = string | number | null;

type State = {
    error?: Err;
}

class ErrorBoundary extends Component<Props, State> {
    state = { error: null };
    static getDerivedStateFromError(error: Err) {
        return { error };
    }
    render(): ReactNode {
        if (this.state.error) {
            return <div>{'error page.'}</div>
        } else {
            return this.props.children;
        }
    }
}
export default ErrorBoundary;