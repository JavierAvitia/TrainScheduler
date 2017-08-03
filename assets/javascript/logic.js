  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCpDNKPIF5iYnNR-T_j-HdJPjyYVAn5F-Y",
    authDomain: "oh-project-my-project.firebaseapp.com",
    databaseURL: "https://oh-project-my-project.firebaseio.com",
    projectId: "oh-project-my-project",
    storageBucket: "oh-project-my-project.appspot.com",
    messagingSenderId: "786534032044"
};

  firebase.initializeApp(config);

  var database = firebase.database();
  var trainName;
  var dest;
  var firstTime;
  var firstTime_format;
  var fMin;
  var current_time = new moment (); //.format("HH:mm")

$( ".btn" ).click(function(event) {

	event.preventDefault();

	trainName = $("#trainName").val();
	dest = $("#dest").val();
	firstTime = moment($("#firstTime").val().replace(":",""), "Hmm");
	fMin = $("#fMin").val();
	//nextTrain

	console.log(trainName + " " + dest + " " + firstTime + " " + fMin + " " + current_time + "; " + current_time.diff(firstTime,'minutes'));

	database.ref("/choochoo").push({

		trainName: trainName,
		dest: dest,
		firstTime: firstTime.format("HH:mm"),
		fMin: fMin,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

	});//end of ref.push

});

//moment("123", "hmm").format("HH:mm")

/*

if (parseInt(minutes) >= 0){

			console.log("In here!")

			minutes = moment(childSnap.val().firstTime.replace(":",""), "Hmm").diff(moment(),'minutes');

			nextTrain = childSnap.val().firstTime;

		}
		else{

			minutes = moment().diff(moment(childSnap.val().firstTime.replace(":",""), "Hmm"),'minutes');

			minutes = minutes % childSnap.val().fMin;

			minutes = childSnap.val().fMin - minutes;

			nextTrain = moment().add((minutes % childSnap.val().fMin),"minutes").format("HH:mm");

		}

*/



database.ref("/choochoo").on("child_added",function(childSnap){

		//converting childSnap.val().firstTime into "Hmm" formatted moment to compare to moment() [current time] and find .diff
		//var minutes = moment().diff(moment(childSnap.val().firstTime.replace(":",""), "Hmm"),'minutes');
		
		var difference = moment(childSnap.val().firstTime.replace(":",""), "Hmm").diff(moment(),'minutes');
		var minutes;
		var nextTrain;

		if (parseInt(difference) >= 0){

			minutes = moment(childSnap.val().firstTime.replace(":",""), "Hmm").diff(moment(),'minutes');

			nextTrain = childSnap.val().firstTime;

		}
		else{

			minutes = moment().diff(moment(childSnap.val().firstTime.replace(":",""), "Hmm"),'minutes');

			minutes = minutes % childSnap.val().fMin;

			minutes = childSnap.val().fMin - minutes;

			nextTrain = moment().add(minutes,"minutes").format("HH:mm");

			console.log(moment().format("HH:mm") + " " + minutes)

		}

		var new_row = $("<tr>");
		new_row.append("<td>" + childSnap.val().trainName + "</td>"
		+ "<td>" + childSnap.val().dest + "</td>"
		+ "<td>" + childSnap.val().fMin + "</td>"
		+ "<td>" + nextTrain + "</td>"
		+ "<td>" + minutes + "</td>");

		$("tbody").append(new_row);

});