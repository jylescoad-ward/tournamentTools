import $ from "jquery";
import moment from "moment";
import pkg from "./../package.json";

$("#buildInfo-no").html(pkg.build.number);
$("#buildInfo-dateandtime").html(moment.unix(pkg.build.timestamp).format("MMMM Do YYYY") + "<br>" + moment.unix(pkg.build.timestamp).format("h:mm:ss A"));
$("#buildInfo-pkg_name").html(pkg.name);
pkg.contributors.forEach((c)=>{
	$("#buildInfo-pkg_contrib").append(c)
})
