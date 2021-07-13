import Header from "../../components/Header/Header";
import localStyles from '../Pages.module.css';
import globalStyles from '../../App.module.css';

const NotFoundPage = () => {    
    
    return (
        <div className={localStyles.page}>
            <Header title="Page not found" />
            <div className={`${localStyles.notFound} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
                <h2 className={globalStyles.fontSize5}>The page you're looking for is missen.</h2>
            </div>
        </div>
    )
};

export default NotFoundPage;