<?php

use function Laravel\Prompts\table;

echo '<style>
table {
    font-family: arial, sans-serif;
    width: 100%;
    border-collapse: collapse; /* Collapse border spacing for a cleaner look */
    margin: 0 auto;
   

}
th, td {
    
    padding: 8px;
    text-align: left;
}

h1 {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 15px;
   
    margin: 0 auto;
   
}

img {
    
    max-width: 30%;
    height: auto;
    border-collapse: collapse
    margin: 0 auto;
}

</style>';

echo '<div class="gatepass-print">';
echo '<img src="C:\laragon\www\gatepass\logo\bulkstream-logo-small.png"  alt="Bulkstream Logo"   >';
//br 
echo '<br>';
echo '<br>';
// return gatepass details in a table
echo '<table class="gatepassdetails" >'; // Set width to 100% to occupy the entire width of the screen
echo '<tr>';
echo '<th>Gatepass Number</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_id . '</td>'; // Align to the right

echo '<th>Printed Date</th>'; // Align to the left
echo '<td>' . date('Y-m-d H:i:s') . '</td>'; // Align to the left
echo '</tr>';

echo '<tr>';
echo '<th>Name</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_name . '</td>'; // Align to the right

echo '<th>Vehicle Reg</th>'; // Align to the left
echo '<td>' . $gatepass->mgr_gtpgatepass_vehiclereg . '</td>'; // Align to the left
echo '</tr>';

echo '<tr>';
echo '<th>Company</th>'; // Align to the right
echo '<td>' . $gatepass->department->company->mgr_gtpcompanies_name . '</td>'; // Align to the right

echo '<th>Department</th>'; // Align to the left
echo '<td>' . $gatepass->department->mgr_gtpdepartments_name . '</td>'; // Align to the left

echo '</tr>';

echo '<tr>';
echo '<th ">Source Location</th>'; // Align to the right
echo '<td ">' . $gatepass->source_location->mgr_gtplocations_name . '</td>'; // Align to the right

echo '<th ">Destination Location</th>'; // Align to the left
echo '<td ">' . $gatepass->destination_location->mgr_gtplocations_name . '</td>'; // Align to the left

echo '</tr>';

echo '<tr>';
echo '<th>Specific Destination</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_destination . '</td>'; // Align to the right
echo '<th>Auxilary Document</th>'; // Align to the left
echo '<td>' .  $gatepass->mgr_gtpgatepass_auxilarydoc . '</td>'; // Align to the left

echo '</tr>';

echo '<tr>';
echo '<th>Purpose</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_purpose . '</td>'; // Align to the right


echo '</table>';

//skip line after table
echo '<br>';

//return items in gatepass table as a table
echo '<h1>Gatepass Items </h1>';
//echo '<br>';
echo '<table class="items">';
echo '<tr>
    <th  style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
   
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code</th>
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">UOM</th>
    </tr>';
foreach ($gatepass->items as $item) {
    echo '<tr>';
    echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_description . '</td>';
    echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_code . '</td>';
    echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_quantity . '</td>';
    echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->uom->mgr_gtpuoms_name . '</td>';
    echo '</tr>';
}

echo '</table>';
//br
echo '<br>';

echo '<table>';
echo '<tr>';
echo '<th>Prepared by</th>';
echo '<td>' . $gatepass->user->mgr_gtpusers_fname . ' ' . $gatepass->user->mgr_gtpusers_lname . '</td>';

echo '<th> On</th>';
echo '<td>' . $gatepass->created_at . '</td>';

echo '</tr>';

foreach ($gatepass->approvals as $approval) {
    echo '<tr>';
    echo '<th>' . $approval->approvallevel->mgr_gtpapprovallevels_label.  '</th>';
    echo '<td>' . $approval->user->mgr_gtpusers_fname . ' ' . $approval->user->mgr_gtpusers_lname . '</td>';
    echo '<th> On </th>';
    echo '<td>' . $approval->created_at. '</td>';
    
    echo '</tr>';

    //return approval date and time for the above approvals
    

}



echo '</table>';
//close div 
echo '</div>';
?>


