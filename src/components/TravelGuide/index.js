import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {
  MainBg,
  TravelHead,
  TravelHeadLine,
  LoaderCont,
  ItemsUl,
  TGItem,
  TgImg,
  TravelPara,
} from './styledComponents'

const apiConst = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

class TravelGuide extends Component {
  state = {apiStatus: apiConst.initial, itemsList: []}

  componentDidMount() {
    this.getItemsList()
  }

  getItemsList = async () => {
    this.setState({apiStatus: apiConst.progress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.packages.map(eachobj => ({
        id: eachobj.id,
        name: eachobj.name,
        imageUrl: eachobj.image_url,
        description: eachobj.description,
      }))
      // console.log(updatedData)
      this.setState({itemsList: updatedData, apiStatus: apiConst.success})
    }
  }

  successView = () => {
    const {itemsList} = this.state
    return (
      <ItemsUl>
        {itemsList.map(eachobj => (
          <TGItem key={eachobj.id}>
            <TgImg src={eachobj.imageUrl} alt={eachobj.name} />
            <TravelHead>{eachobj.name}</TravelHead>
            <TravelPara>{eachobj.description}</TravelPara>
          </TGItem>
        ))}
      </ItemsUl>
    )
  }

  progressView = () => (
    <LoaderCont data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderCont>
  )

  view = apiStatus => {
    switch (apiStatus) {
      case apiConst.progress:
        return this.progressView()
      case apiConst.success:
        return this.successView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <MainBg>
        <TravelHead>Travel Guide</TravelHead>
        <TravelHeadLine />
        {this.view(apiStatus)}
      </MainBg>
    )
  }
}

export default TravelGuide
