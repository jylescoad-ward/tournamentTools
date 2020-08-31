function filterArray(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}
async function gimmieMatch(d) {
//fs.readFile("test.json", 'utf8',async (e,d)=>{
	const parsedUser = d;

	var userInfoTable = `
<table class="table table-responsive table-sm">
	<tbody>
        <tr>
            <th>Username</th>
            <td>${d.attributes.name}</td>
        </tr>
        <tr>
            <th>AccountID</th>
            <td>${d.id}</td>
        </tr>
        <tr>
            <th>Created At</th>
            <td>${d.attributes.createdAt}</td>
        </tr>
    </tbody>
</table>
	`;

    var innerRecentMatch = [];
	parsedUser.matches.forEach(async(m)=>{

		var teamReturn = `
		<tr class="viewUser pastMatches">
			<th scope="row">${m.id}</th>
			<td><button id="viewUser_selectMatch" value="${m.id}">View Match</button></td>
		</tr>
		`;
        innerRecentMatch.push(teamReturn.replace(";",""))
	})

	var innerMatchHistoryInfoComplete=" ";
	innerRecentMatch.forEach((r)=>{
		innerMatchHistoryInfoComplete+=r;
	})

	var pastMatchesTable = `
	<table class="table table-sm">
		<thead>
			<tr>
				<th scope="col">MatchID</th>
				<th scope="col">View Match</th>
			</tr>
			</tr>
		</thead>
		<tbody>
			${innerMatchHistoryInfoComplete}
		</tbody>
	</table>
	`;

	var finalHTMLOut = `
	<div clas="viewUser userInfo">
		${userInfoTable}
	</div>
	<hr>
	<div class="viewUser pastMatches">
		${pastMatchesTable}
	</div>
	`;

	return finalHTMLOut;
}

var $ = require("jquery");
async function setThing(data){
    try {
    	$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
    	console.div("[UserToHTML] Processing Request...");
    	$("#view_data_currentlyViewing_short").html("Processing Request");
    	$("#viewDataField").html("<h1>Processing a request. Please Wait</h1>");
    	const result = await gimmieMatch(data);
    	$("#view_data_currentlyViewing").html(`User: ${data.attributes.name}`)
        console.log(result)
    	$("#viewDataField").html(result);
    		console.div("[UserToHTML] Processed Request.");
    		$("#view_data_currentlyViewing_short").html("Ready to View Userinfo");
    } catch (e){
        console.error(new Error(e));
    }
}
module.exports = function(data) {
	$("#processUser-view").click(async () => {
		setThing(data)
	});
}

module.exports.force = function(data){
	setThing(data);
}
