import React from "react"

const TablePage = ({data, category, writer}) => {
	// console.log("data", data, "category", category, "writer", writer)
	let writerNameArr = new Set()
	let newdata
	if (writer) {
		if (category) {
			newdata = data.filter(item => item.trade_author === writer).filter(item => item.trade_category === category)
		} else {
			newdata = data.filter(item => item.trade_author === writer)
		}
	} else {
		if (category) {
			newdata = data.filter(item => item.trade_category === category)
		} else {
			newdata = data
		}
	}
	// console.log("newdata", newdata)
	let score = {}
	let status = {}
	if (newdata.length !== 0 && newdata.length !== undefined && newdata !==undefined) {
		
		newdata.forEach(item => writerNameArr.add(item.trade_author))
		writerNameArr.forEach(item => {
			score[item] = 0
			status[item] = {}
			status[item]["total"] = 0
			status[item]["success"] = 0
			status[item]["waiting"] = 0
			status[item]["failed"] = 0
			newdata.filter(list => list.trade_author === item).forEach(list => {
			score[item] += list.trade_score
			switch(list.trade_status_flag) {
			  case "success":
			    status[item]["total"] += 1
				status[item]["success"] += 1
			    break;
			  case "waiting":
			    status[item]["total"] += 1
				status[item]["waiting"] += 1
			    break;
			  case "failed":
			    status[item]["total"] += 1
				status[item]["failed"] += 1
			    break;
			  default:
			    break;
			} 
			})
		})
	}
	// console.log("score", score)
	// console.log("status", status)
	// console.log("writerNameArr", writerNameArr)
	const writerNameList = Array.from(writerNameArr)
	// console.log("writerNameList", writerNameList)
	writerNameList.sort(function(a,b) {return score[b]- score[a]})
	// const [filterWriter, setFilterWriter] = React.useState(writerNameList)

	// console.log("writerNameList sorted", writerNameList)
	let ranking_no = 0
	return (
		<div>
		<table className="table">
    <thead className="thead-dark">
      <tr>
      	<th>Ranking NO</th>
        <th>Writers	</th>
        <th>Status</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
    {
    	writerNameList.length !== 0 && writerNameList.length !== undefined && writerNameList !==undefined
    	? writerNameList.map(list => {
    		const success_percent = status[list].success / status[list].total * 100
    		const waiting_percent = status[list].waiting / status[list].total * 100
    		const failed_percent = status[list].failed / status[list].total * 100
    		// console.log("waiting_percent", waiting_percent)
    		return (
    		<tr>
	    		<td>{ranking_no += 1}</td>
	    		<td>{list}</td>
	    		<td>
	    			<tr>Total: {status[list].total}</tr>
	    			<tr>Success: {status[list].success}
	    				<div className="w3-light-grey w3-tiny">
				    		<div className="w3-container w3-green" style={{width: `${success_percent}%`}}>{success_percent}%</div>
				  		</div>
	    			</tr>
	    			<tr>Waiting: {status[list].waiting}
	    				<div className="w3-light-grey w3-tiny">
				    		<div className="w3-container w3-green" style={{width: `${waiting_percent}%`}}>{waiting_percent}%</div>
				  		</div>
	    			</tr>
	    			<tr>Failed: {status[list].failed}
	    				<div className="w3-light-grey w3-tiny">
				    		<div className="w3-container w3-green" style={{width: `${failed_percent}%`}}>{failed_percent}%</div>
				  		</div>
	    			</tr>
	    		</td>
	    		<td>{score[list]}</td>
    		</tr>
    		)}
    		)
    	: <tr>No Data</tr>
    	
    }
    </tbody>
  </table>
		</div>
		)
}
export default TablePage