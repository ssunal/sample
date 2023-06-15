import React from 'react';
import {InputGroup} from 'react-bootstrap';
import ProjectDefaults from './projectdefaults.json';
import { CSVLink, CSVDownload } from "react-csv";
import './App.css';
import CurrencyFormat from 'react-currency-format';
import Deneme from './deneme';
import Cari from './cari';
import moment from 'moment-timezone'
import { Footer,PostToBackend,Matrix } from "./deneme";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
export default class AracDeger extends React.Component {
    var=undefined
    arac_deger_listesi=undefined
    arac_deger_listesi_bac=undefined
    tahsilat=[]
    constructor(props) {
        super(props)

        this.var={pgmName:'/aracDegerGoster',ilk_satir:0,son_satir:0}
        this.var.pgmName=this.props.object.var.pgmName
        //consile.log(this)
        this.site=ProjectDefaults[ProjectDefaults.now]
        this.state={tckn_vergi_no:undefined}
        this.backToComponent=this.backToComponent.bind(this)
        this.backToState=this.backToState.bind(this)
         }
    async   handleButtonClicked(event){
        let flag=true
        if(this.var.pgmName==='/aracDegerGoster'){
            this.forceUpdate()
        }if(this.var.pgmName==='aracDegerGoster'){
            this.forceUpdate()
        }
    }
    async handleAracDegerButtonClicked(event){
     await   this.getAracDegerListesi()
        this.var.service_key='aracDegerGoster'
        //consile.log(this)
        await this.handleButtonClicked(event)
    }
    async getAracDegerListesi() {
        let   data = {"service_key": "arac_deger_listesi.read",
            "json": {
                "users": [{
                    "makeVO":this.props.object.var.sbm_made,
                    "modelVO":this.props.object.var.sbm_model,
                    "modelYili":this.props.object.var.modelYili,
                    "only_parameters":true}],
                    "sort":" ORDER BY modelYili DESC ",
                    "where":[{"makeVO":this.props.object.var.sbm_made,
                              "modelVO":this.props.object.var.sbm_model}] }
            }

        //consile.log(data)
        var details = {
            'API_KEY': this.var.api_key,
            'rand_key': this.site.center_rand_key,
            'service_key': data.service_key,
            "json":JSON.stringify(data.json)
        }
        let service_key=this.props.object.var.M_url+'/connection/'+data.service_key+'.php'
       //consile.log(details)
        await PostToBackend(details, service_key, this)
        let json_gelen = JSON.parse(this.return)
        //consile.log('made model bilgi sorgu sonucu')
        //consile.log(json_gelen)
      //consile.log(this.return)
        try {
            if (json_gelen.arac_deger_listesis.arac_deger_listesi!==undefined) {

                this.arac_deger_listesi=json_gelen.arac_deger_listesis.arac_deger_listesi
                await this.getAracDegerListesi_bac()

            }}
        catch (e){
            //consile.log('arac değer listesi gelemedi')
            //consile.log(json_gelen)
            this.arac_deger_listesi=undefined

        }
    }
    async getAracDegerListesi_bac() {
        let   data = {"service_key": "arac_deger_listesi_bac.read",
            "json": {
                "users": [{
                    "makeVO":this.props.object.var.sbm_made,
                    "modelVO":this.props.object.var.sbm_model,
                    "modelYili":this.props.object.var.modelYili,
                    "only_parameters":true}],
                    "sort":" ORDER BY  modelYili DESC ",
                    "where":[{"makeVO":this.props.object.var.sbm_made,
            "modelVO":this.props.object.var.sbm_model}] }
            }

        //consile.log(data)
        var details = {
            'API_KEY': this.var.api_key,
            'rand_key': this.site.center_rand_key,
            'service_key': data.service_key,
            "json":JSON.stringify(data.json)
        }
        let service_key=this.props.object.var.M_url+'/connection/'+data.service_key+'.php'
        //consile.log(service_key)
        await PostToBackend(details, service_key, this)
        let json_gelen = JSON.parse(this.return)
        //consile.log('made model bilgi sorgu sonucu')
        //consile.log(json_gelen)
        //consile.log(this.return)
        try {
            if (json_gelen.arac_deger_listesi_bacs.arac_deger_listesi_bac!==undefined) {

                this.arac_deger_listesi_bac=json_gelen.arac_deger_listesi_bacs.arac_deger_listesi_bac

            }}
        catch (e){
            //consile.log('arac değer listesi gelemedi')
            //consile.log(json_gelen)
            this.arac_deger_listesi_bac=undefined

        }
    }
    backToComponent(event){
        if(event.target.id==='return'){
            this.var.pgmName='return'
            this.props.object.var.pgmName='mainMenu'
            this.props.object.var.service_key='Menu.getMenuForUsername'
            this.forceUpdate()
        }
    }
    backToState(event){
        //consile.log(this)
        //consile.log(event)
        if(event.target.id==='/aracDegerGoster'){
            this.props.object.var.sbm_made=undefined
            this.var.pgmName='/aracDegerGoster'
            this.var.service_key=undefined
            this.arac_deger_listesi=undefined
            this.handleButtonClicked(event)
        }

    }
    async handleAracDegerInputChanged(event) {
        const isEqual = require("react-fast-compare");

        if (isEqual(event.target.name, 'modelYili') || event.target.name==='modelYili') {
            this.var.modelYili=event.target.value
            this.forceUpdate()
        }
        if (isEqual(event.target.name, 'sbm_made') || event.target.name==='sbm_made') {
            this.var.sbm_made=event.target.value
            this.props.object.var.modelYili=this.var.modelYili
            this.props.object.var.sbm_made=event.target.value
            await  this.props.object.getModelService()
            //consile.log(this)
            this.forceUpdate()
        }
        if (isEqual(event.target.name, 'sbm_model') || event.target.name==='sbm_model') {
            this.var.sbm_model=event.target.value
            this.forceUpdate()
        }
        // this.forceUpdate()
    }
    ObjSbm_made() {
            if (this.var.modelYili !== undefined) {
                return (<div>
                        <div>
                            <label htmlFor="sbm_made" required><h5>Made:</h5>
                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                        name="sbm_made" value={this.var.sbm_made}
                                        onChange={this.handleAracDegerInputChanged.bind(this)}>
                                    <option value="">Select</option>
                                    {
                                        Object.values(this.props.object.makeVO).map(function (value) {
                                                return (<option value={value.makeVO}>{value.makeVO_name}</option>)
                                            }
                                        )
                                    }
                                </select>
                                <span style={{color: "red"}}>{this.var.aracSorgu_sbm_made_errorloc}</span></label>
                        </div>
                        <div className="ten columns"></div>
                    </div>
                )
            }


    }
    ObjSbm_model() {
        //consile.log(this.var)
            if (this.var.sbm_made !== undefined && this.props.object.modelVO !== undefined) {
                return (
                    <div>
                        <div>
                            <label htmlFor="sbm_model" required><h5>Model:</h5>

                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                        name="sbm_model" value={this.var.sbm_model}
                                        onChange={this.handleAracDegerInputChanged.bind(this)}>
                                    <option value="">select</option>
                                    {
                                        Object.values(this.props.object.modelVO).map(function (value) {
                                                return (<option value={value.modelVO}>{value.modelVO_name}</option>)
                                            }
                                        )
                                    }


                                </select>
                                <span style={{color: "red"}}>{this.var.aracSorgu_sbm_model_errorloc}</span>
                            </label>
                        </div>
                        <div className="ten columns"></div>
                    </div>
                )
            }
        }
  /*  ObjModelYili() {
        let arr=[]
        for (let i = 2021; i > 0; i--) {
            arr.push(i)
        }
       return(
            <label id="modelYiliId"   htmlFor="modelYili" required><h5>Model Yılı:</h5>
                <div className="select-grid">
                    <select id="modelYiliId"  class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"  name="modelYili" value={this.var.modelYili}
                            onChange={this.handleAracDegerInputChanged.bind(this)}>
                        <option   value="">Select</option>
                            {arr.map(item => (
                                    <option key={item}>{item}</option>
                                ))}
                    </select>
                </div>
            </label>

        )
    }*/
    ObjAracDeger(){
            let aracDeger=[]
            let aracDeger_bac=[]
            let tutar=0
        aracDeger=this.arac_deger_listesi
        aracDeger_bac=this.arac_deger_listesi_bac
        let st={
            border: "1px solid #ddd",
            padding: "8px",
            textAlign: "right"
        }
        let date_create= moment().format("DD/MM/YYYY")
        return (<div className="container">
            {this.props.object.ilkmenu()}

            <div>
                <p>Türkiye Sigorta Birliği tarafından her ay yayınlanan kasko değer listesinden her ay güncel olarak alınan fiyatlarla</p>
                <br />
                <p>Son güncellenme tarihi : {date_create}</p>
                <br />
                <h5>{this.var.make_name}</h5>
                <br />
                <h5>{this.var.model_name}</h5>
                <br />
                <h5>SBM KODU: {this.props.object.var.sbm_made + ' ' +
                +this.props.object.var.sbm_model}
                </h5>
                <table className="manage-table resumes responsive-table">
                    <tbody>
                        <tr >
                            <th style={st}><h5 style={{marginLeft: "2px"}}>Model Yılı</h5></th>
                            <th style={st}><h5 style={{marginLeft: "2px"}}>Araç Değeri</h5></th>
                            <th style={st}><h5 style={{marginLeft: "2px"}}>Önceki ay Araç Değeri</h5></th>
                            <th style={st}><h5 style={{marginLeft: "2px"}}>Artış Oranı %</h5></th>
                        </tr>
                        {
                            Object.values(aracDeger).map(function (value) {
                                if (parseInt(value.arac_deger) !== 0) {
                                    return (<tr>
                                        <td style={st}>{value.modelYili}</td>
                                        <td style={st}>{parseFloat(value.arac_deger).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                        {Object.values(aracDeger_bac).map( (value1) =>{
                                            if (value.modelYili === value1.modelYili) {
                                                if (parseInt(value1.arac_deger) !== 0) {
                                                    return (
                                                        <td style={st}>{parseFloat(value1.arac_deger).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    )
                                                }
                                            }
                                        })
                                        }
                                        {Object.values(aracDeger_bac).map( (value1) =>{
                                            if (value.modelYili === value1.modelYili) {
                                                if (parseInt(value1.arac_deger) !== 0) {
                                                    return (
                                                        <td style={st}>{parseFloat(((parseFloat(value.arac_deger) / parseFloat(value1.arac_deger)) - 1)*100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    )
                                                }
                                            }
                                        })
                                        }
                                    </tr>)
                                }    })

                        }


                        </tbody>

                    <br />



                </table>
                <img style={{width: '50px'}} src={'/images/back.jpg'}  name="/aracDegerGoster" id="/aracDegerGoster" alt="back"
                     onClick={this.backToState.bind(this)} />
            </div>
            <Footer/>
        </div>)
    }
    ObjmadeModel(){
            let aracDeger=[]
        return (<div>
        <div className="container">
            {this.props.object.ilkmenu()}

            <div >
                {this.props.object.ObjModelYili()}
                {this.props.object.ObjSbm_made()}
                {this.props.object.ObjSbm_model()}

                <div >
                    <button type="button" class="button"
                            style={{visibility: this.props.object.var.sbm_model!==undefined?'visible':'hidden',marginBottom:'10px'}}
                           name="service_key" value="aracSorgu"
                            onClick={this.handleAracDegerButtonClicked.bind(this)}>
                        Araç Değerini getir
                    </button>
                </div>
                {this.backTo()}

            </div>
            <Footer/>
            </div>

        </div>)
    }
backTo(){
        if(this.props.object.var.params===undefined ) {
            return (
                <img style={{width: '50px'}} src={'/images/back.jpg'} name="return" id="return" alt="back"
                     onClick={this.backToComponent.bind(this)}/>
            )
        }
}
    render (){
        if( this.var.pgmName!=='return') {
            this.var.pgmName = this.props.object.var.pgmName
        }
        //consile.log(this)
        if(this.wait===true ){
            return (
                <div className="container">
                    {this.props.object.ilkmenu()}
                    <Matrix form={this.props.object}/>
                    <Footer/>
                </div>)
        }
        switch (this.var.pgmName) {
            case 'return':
                return(<Deneme var={this.props.object.var} />)
            case '/aracDegerGoster':
            //consile.log(this)
            if( this.arac_deger_listesi!==undefined){
                let made=this.props.object.var.sbm_made
                let model=this.props.object.var.sbm_model

                Object.values(this.props.object.makeVO).map(function (value) {
                    if(value.makeVO===made){
                        made=value.makeVO_name
                    }
                })
                //consile.log(made)
                Object.values(this.props.object.modelVO).map(function (value) {

                    if(value.modelVO===model){
                        model=value.modelVO_name
                    }
                })
                this.var.make_name=made
                this.var.model_name=model
                return(this.ObjAracDeger())
            } else {
                return(this.ObjmadeModel())
            }

            default:
                //consile.log('geldi default')
                //consile.log(this.var.pgmName)
                //consile.log(this.props.object.var.pgmName)
                return(this.ObjmadeModel())
        }
    }
}
