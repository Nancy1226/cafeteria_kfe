import "./shopCoffe.css";
import TopBar from '../components/organisms/TopBar/TopBar'
import Menu from '../components/templates/Menu/Menu'
import Order from '../components/templates/Order/Order'

function ShopCoffe({nameCoffeShop, roleUser}) {
  return (
    <>
    <TopBar nameCoffeShop={'Cafeteria KFE'} roleUser={'admin'} />
    <div className="container__body">
      <Menu />
      <Order />
    </div>
    </>
  )
}

export default ShopCoffe;
