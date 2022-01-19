import React, { useEffect, useState } from 'react'
import * as categoriesActions from '../../actions/categoriesActions'
import * as vinesActions from '../../actions/vinesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Checkbox, AutoComplete, Modal } from 'antd';
import Pagination from '../pagination'
import Products from '../products'
import Slider from '../slider'
import Rating from '../rating'
import Taging from '../taging'
import Input from '../input'
import Input2 from '../input2'
import Shops from '../shops'
import 'antd/dist/antd.css';
import './index.css'

function Offers(props) {

    const [data, setData] = useState({
        page: 1,
        field: `ratings_average`,
        rate: `desc`,
        limit: `10`,
        search: ``,
        max_price: localStorage.getItem("priceRange") ? JSON.parse(localStorage.getItem("priceRange")).max_price : ``,
        min_price: localStorage.getItem("priceRange") ? JSON.parse(localStorage.getItem("priceRange")).min_price : ``,
        wine_types: [],
        region: ``,
        country: ``,
        wine_style: ``,
        winery: ``,
        grape: ``,
        food: ``,
    })

    const vinesCategory = props.categories?.map(item => {return({
        value: item.id,
        label: item.title,
    })})

    localStorage.setItem("defaultPrice", JSON.stringify({"min_price": 250, "max_price": 750}))

    const [checkedList, setCheckedList] = useState([])

    const CheckboxGroup = Checkbox.Group;

    const checkCategory = (list) => {
        setCheckedList(list)
        setData(prev => ({
            ...prev,
            page: 1,
            wine_types: list.map((item) => `&wine_type[]=${item}`).join(""),
        }))
        props.vinesActions.getVines({ ...data, wine_types: list.map((item) => `&wine_type[]=${item}`).join("") })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chosenVine, setChosenVine] = useState(``)

    const showModal = (id, name) => {
        setChosenVine(name)
        setIsModalVisible(true);
        props.vinesActions.getShops({ vintage_id: id })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        props.categoriesActions.getCategories()

        if (props.location?.query) {
            setCheckedList([...checkedList, props.location.query])
            setData(prev => ({
                ...prev,
                page: 1,
                wine_types: [...checkedList, `&wine_type[]=${props.location.query}`],
            }))
        }

        props.vinesActions.getVines({ ...data, wine_types: props.location.query ? `&wine_type[]=${props.location.query}` : "" })
    }, [])

    return (
        <div className="offers">
            <div className="filters">
                <div className="filter-item">
                    <sub>Location</sub>
                    <input type="text" placeholder="Enter location"/>
                </div>
                <Input saga={"search"} name={"name"} data={data} setData={setData}></Input>
                <div className="filter-item">
                    <sub>Categories</sub>
                    <CheckboxGroup options={vinesCategory} value={checkedList} onChange={checkCategory} />
                </div>
                <Input2 saga={"region"} name={"region"} data={data} setData={setData}></Input2>
                <Input2 saga={"country"} name={"country"} data={data} setData={setData}></Input2>
                <Input2 saga={"wine_style"} name={"style"} data={data} setData={setData}></Input2>
                <Input2 saga={"winery"} name={"winery"} data={data} setData={setData}></Input2>
                <Input2 saga={"grape"} name={"grape"} data={data} setData={setData}></Input2>
                <Input2 saga={"food"} name={"food"} data={data} setData={setData}></Input2>
            </div>
            <div className="products">
                <Slider data={data} setData={setData}></Slider>
                <div className="sorting-filter">
                    <Taging data={data} setData={setData} checkedList={checkedList} setCheckedList={setCheckedList} vinesCategory={vinesCategory}></Taging>
                    <div className="sorting-filter-space"></div>
                    <Rating data={data} setData={setData}></Rating>
                </div>
                <Products vines={props.vines} total={props.total} showModal={showModal}></Products>
                <Modal title={"Online Shops which sells " + chosenVine } visible={isModalVisible} onCancel={handleCancel}>
                    <Shops shops={props.shops}></Shops>
                </Modal>
                <Pagination data={data} setData={setData} total={props.total}></Pagination>
            </div>
        </div>
        
    );
}

const mapStateToProps = state => ({
    isLoading: state.categories.isLoading,
    categories: state.categories.categories,

    total: state.vines.total,
    vines: state.vines.vines,

    searchResult: state.vines.searchResult,

    shops: state.vines.shops,
})

const mapDispatchToProps = dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    vinesActions: bindActionCreators(vinesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Offers));