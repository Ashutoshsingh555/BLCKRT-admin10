// import React from 'react';
// import { render } from 'react-dom';
// import { slideDown, slideUp } from './anim';
// import './style.css';


// function formatDate(str) {
//   return str.substr(0, 10);
// }

// function capitalize(str) {
//   return str.split(' ').map(s => {
//     return s.charAt(0).toUpperCase() + s.substr(1);
//   }).join(' ');
// }


// export default class  UserTableRow  extends React.Component {
//   state = { expanded: false }

//   toggleExpander = (e) => {
   

//     if (!this.state.expanded) {
//       this.setState(
//         { expanded: true },
//         () => {
//           if (this.refs.expanderBody) {
//             slideDown(this.refs.expanderBody);
//           }
//         }
//       );
//     } else {
//       slideUp(this.refs.expanderBody, {
//         onComplete: () => { this.setState({ expanded: false }); }
//       });
//     }
//   }

//   render() {
//     const { category } = this.props;
//     return [
//       <tr key="main" onClick={this.toggleExpander}>
        
     
    
//         <td>{capitalize(category.name)}<br /><small>{category.name}</small></td>
       
//       </tr>,
//       this.state.expanded && (
//         <tr className="expandable" key="tr-expander">
//           <td className="uk-background-muted" colSpan={6}>
//             <div ref="expanderBody" className="inner uk-grid">
//               {/* <div className="uk-width-1-4 uk-text-center">
//                 <img className="uk-preserve-width uk-border-circle" src={category.picture.large} alt="avatar" />
//               </div>
//               <div className="uk-width-3-4">
//                 <h3>{capitalize(category.name.first + ' ' + category.name.last)}</h3>
//                 <p>
//                   Address:<br/>
//                   <i>
//                     {capitalize(category.location.street)}<br/>
//                     {category.location.postcode} {capitalize(category.location.city)}<br/>
//                     {category.nat}
//                   </i>
//                 </p>
//                 <p>
//                   E-mail: {category.email}<br/>
//                   Phone: {category.phone}
//                 </p>
//                 <p>Date of birth: {formatDate(category.dob)}</p>
//               </div> */}
//             </div>
//           </td>
//         </tr>
//       )
//     ];
//   }
// }
