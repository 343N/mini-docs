import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import './data.json'


//pure-data classes
class Package {
    constructor(name, classes){
        this._name = name
        this._classes = classes
    }

    addClass(cls) { 
        this._classes[cls.getName()] = cls 
    }

    removeClass(cls){
        delete this._classes[cls.getName()]
    }
    get name () { return this._name }
    set name (name) { this._name = name }
}

class Class {
    constructor(data){
        this._package = data.package
        this._name = data.name
        this._methods = data.methods
        this._type = data.type
        this._returnType = data.returnType
        this._members = data.members
        this._desc = data.desc

    }

    set methods (methods)   { this._methods = methods }
    get methods ()          { return this._methods } 

    addMethod(method)       { this._methods[method.getName()] = method }
    removeMethod(method)    { this._methods[method.getName()] = null}

}



class Method {
    constructor(data){
        this._name = data.name
        this._type = data.type
        this._class = data.class
        this._returnType = data.returnType
        this._desc = data.desc
    }

    get name () { return this._name }
    set name (name) { this._name = name }
}

class DataMember {
    constructor(data){
        this._name = data.name
        this._type = data.type
        this._class = data.class
        this._desc = data.desc
    }

    get name () { return this._name }
    set name (name) { this._name = name }
}

class Constructor extends Method { 
    constructor(data){
        data.name = data.class
        super(data)

    }

    
}

class Type {
    constructor(obj){
        this._types = {
            public: false,
            private: false,
            protected: false,
            static: false,
            abstract: false,
            final: false
        }
        
    }

    get types ()        { return this._types }
    set types (types)   { this._types = types }

}





















///react classes
class Index extends React.Component{
    // constructor(){
    //     super()
    constructor(){
        super();
        this.handleSearchQuery = this.handleSearchQuery.bind(this)    
    }

    // }
    render(){
        return (    
        <div className="index">
            <HeaderBar handleSearchQuery={this.handleSearchQuery} />
            <SideBar />
            <MainView />
        </div>
        )
    }

    handleSearchQuery(data){
        console.log(data);
    }
}

class HeaderBar extends React.Component{
    constructor(){
        super();
        this.handleSearchQuery = this.handleSearchQuery.bind(this)    
    }
    render(){
        return (<div className="HeaderBar" id="container"><HeaderBarSearchView handleSearchQuery={this.handleSearchQuery} /></div>)
    }

    handleSearchQuery(data){
        this.props.handleSearchQuery(data)
    }
}

class SideBar extends React.Component{
    render(){
        return (
        <div className="SideBar" id="container">
            <div className="SideBar" id="heading">
                Packages & Classes
            </div>
            
            <SideBarPackageList />
        </div>)

    }
        
    
}

class MainView extends React.Component{
    render(){
        return (<div className="MainView"></div>)

    }
}

class HeaderBarSearchView extends React.Component{

    constructor(){
        super();
        this.handleSearchQuery = this.handleSearchQuery.bind(this)    
    }
    render() {
        return (<input className="HeaderBar" id="searchInput" placeholder="Search" onChange={this.handleSearchQuery} />)
    }

    handleSearchQuery(e) {
        this.props.handleSearchQuery(e.target.value);
    }

}


class SideBarPackageList extends React.Component{
    render(){
        return (<div className="SideBar" id="packageList">
            <Modal data={{
                modalType: "Package",
                inputs: ["Package Name", "Package Full Title"]
            }}/>

        </div>)
    }
}   

class Modal extends React.Component {
    constructor(){
        super()
        this.state = {
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    render(){
        if (!this.state.isOpen) {
           return (
               <div className="ModalContainer" id={this.props.data.modalType}>
                    <button className="ModalContainer" id="toggleButton" onClick={this.toggleModal}>Add {this.props.data.modalType}</button>
               </div>)
        } else {
            var inputs = this.props.data.inputs
            var elements = [];
            inputs.forEach(e => {
                elements.push(<ModalInput title={e} id={e} modalType={this.props.modalType} handleInputChange={this.handleInputChange} className="ModalContainer" key={e}/>)
            }) 
            return (<div className="ModalContainer" id={this.props.data.modalType}>
                    <button className="ModalContainer" id="toggleButton">Add {this.props.data.modalType}</button>
                    {elements}
                    <ModalSubmitButton title={"Add"} className="ModalContainer" id="submit"/>                   
            </div>)
        }
    }


    
    toggleModal(){
        this.setState({isOpen: !this.state.isOpen});
    }

    handleInputChange(data){
        this.props.handleInputChange(data)
    }
}


class ModalInput extends React.Component{
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);    
    }
    render(){
        const title = this.props.title;
        const cls = this.props.class;
        const type = this.props.type;
        return (
        <div>
            <div className={cls} id="title">{title}</div>
            <input className={cls} id="input" onChange={this.handleInputChange}></input>
        </div>)
    }

    handleInputChange(e){
        this.props.handleInputChange({id: this.props.id, value: e.target.value});
    }

}

class ModalSubmitButton extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (<button className={this.props.className} onClick={this.handleSubmit}>{this.props.title}</button>)
    }

    handleSubmit(){
        this.props.handleSubmit();
    }
}










ReactDOM.render(<Index />, document.getElementById("root"))
