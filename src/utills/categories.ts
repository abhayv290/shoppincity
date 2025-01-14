import { AiFillCamera, AiFillCar, AiFillPhone, AiOutlineDesktop, AiOutlineLaptop, AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { BsSmartwatch } from "react-icons/bs";
import { FaBiking } from "react-icons/fa";
import { FaFileAudio, FaHeadphones } from "react-icons/fa6";
import { MdMan, MdSpeaker, MdStorefront, MdWoman } from "react-icons/md";

const categories = [
    { label: 'All', icon: MdStorefront },
    { label: 'Phone', icon: AiFillPhone },
    { label: 'Laptop', icon: AiOutlineLaptop },
    { label: 'Desktop', icon: AiOutlineDesktop },
    { label: 'Smart Watch', icon: BsSmartwatch },
    { label: 'Headphones', icon: FaHeadphones },
    { label: 'Speakers', icon: MdSpeaker },
    { label: 'Cars', icon: AiFillCar },
    { label: 'Bikes', icon: FaBiking },

]
export default categories;