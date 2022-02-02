import React, { useState } from 'react'
import '../App.css'

const Menu = () => {
    const [order, setOrder] = useState([
        {name: "Burger", num: 0},
        {name: "Fries", num: 0},
        {name: "Shake", num: 0},
        {name: "Chips", num: 0}
    ])
    const [showNum, setShowNum] = useState(Array(order.length).fill(false))
    const handleChange = event => {
        if (/^\d+$/.test(event.target.value) || event.target.value=="") update(event.target.id.substring(5), event.target.value)
    }
    const handleAdd = index => {
        update(index, "add")
    }
    const handleSubtract = index => {
        update(index, "subtract")
    }

    const update = (index, operation) => {
        let newOrder = [...order]
        if (operation==="add") {
            newOrder[index].num++
        }
        else if (operation==="subtract") {
            if (newOrder[index].num!==0) {
                newOrder[index].num--
            }
        }
        else if (operation==="") {
            console.log("blank")
            newOrder[index].num = ""
        }
        else {
            newOrder[index].num = Number(operation)
        }

        let newShowNumArr = [...showNum]
        if (!showNum[index] && newOrder[index].num>0) {
            newShowNumArr[index] = true
        }
        else if (showNum[index] && newOrder[index].num===0) {
            newShowNumArr[index] = false
        }
        setShowNum(newShowNumArr)
        setOrder(newOrder)
    }

    return (
        <div  className="menu-page">
            <div className="menu-title">
                <h1>Hamburger Store</h1>
            </div>
            <div className={"menu-container"}>
            <form className={"menu"}>
                {
                    order.map((item, index) => {
                        return (
                            <div key={"item-"+index} name={"item-"+index} onClick={() => {order[index].num==0 && handleAdd(index)}} className={"menu-item"}>
                                <label>{item.name}</label>                                    
                                {showNum[index] &&
                                    <>
                                        <div className={"num-container"} onClick={e => e.stopPropagation()}>
                                            <input name={"minus-"+index} type="button" value="-" onClick={() => handleSubtract(index)} className={"add-sub-button"}/>
                                            <input id={"item-"+index} name={item.name} value={order[index].num!==0 ? order[index].num : ""} onChange={handleChange} onBlur={() => {if (order[index].num==="") update(index, 0)}} className={"number-field"}/>
                                            <input name={"plus-"+index} type="button" value="+" onClick={() => handleAdd(index)} className={"add-sub-button"}/>
                                        </div>
                                        <div className={"remove-button-container"} onClick={e => e.stopPropagation()}>
                                            <input name={"remove-"+index} type="button" value="Remove Item" onClick={() => update(index, 0)} />
                                        </div>
                                    </>
                                }
                            </div>
                        )
                    })                    
                }
            </form>
            </div>
        </div>
    )
}

export default Menu;