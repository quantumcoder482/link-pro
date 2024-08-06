import { ImPlus } from "react-icons/im";
import {useContext} from 'react';
import {UserLinksContext} from '../../Dashboard.jsx';

const AddLink = ({
                     subStatus,
                     setShowUpgradePopup,
                     setShowLinkForm
}) => {

    const { userLinks } = useContext(UserLinksContext);
    const handleClick = (e) => {
        e.preventDefault();

        const newUserLinks = userLinks.filter( (element) =>
            element.type !== "folder" && element.type !== "mailchimp" && element.type !== "shopify"
        );
        const count = newUserLinks.length;

        if (count < 8 || subStatus ) {

            setShowLinkForm(true);

            setTimeout(function(){
                document.querySelector('#scrollTo').scrollIntoView({
                    behavior: 'smooth',
                    block: "start",
                    inline: "nearest"
                });

            }, 800)

        } else {
            setShowUpgradePopup({
                show: true,
                text: "add more icons"
            });
        }
    };

    return (

        <a href="" className="icon_wrap" onClick={handleClick}>
            <ImPlus />
            <h3>Add Icon</h3>
        </a>

    )
}
export default AddLink;
