import localStyles from './Loading.module.css';

interface Props {
    message?: string;
}

const Loading = ({message = "Loading"}: Props) => (
    <div className={localStyles.loading}>
        <span className={`${localStyles.loadingIcon} material-icons-round`}>rotate_right</span>
        <h4 className={localStyles.loadingMessage}>{message}...</h4>
    </div>
)

export default Loading;