import { resetUser } from '../redux/userSlice';
import { resetCart } from '../redux/cartSlice';
import { resetProducts } from '../redux/productsSlice';

const resetAllState = (dispatch) => {
    localStorage.clear()
    dispatch(resetUser())
    dispatch(resetProducts())
    dispatch(resetCart())
}

export default resetAllState
