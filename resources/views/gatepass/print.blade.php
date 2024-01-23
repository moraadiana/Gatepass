<?php

use Sabberworm\CSS\Property\Import;

use function Laravel\Prompts\table;
//import image from here "../assets/bulkstream-logo-small.png"  


echo '
<style>
table {
    font-family: arial, sans-serif;
    width: 100%;
    border-collapse: collapse; /* Collapse border spacing for a cleaner look */
    margin: 0 auto;
    
  

}
th {
    
    padding: 8px;
    text-align: left;
    font-size: 15px;
    font-family: "Arial Black", Gadget, sans-serif;
 
}
td {
    
    padding: 8px;
    text-align: left;
    font-size: 16px;
    font-family: "Arial Black", Gadget, sans-serif;
    

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


$imageUrl = public_path('assets/bulkstream-logo-small.png');;
echo "<img src='$imageUrl' alt='logo'>";
echo '<br>';
echo '<br>';
// return gatepass details in a table
echo '<table class="gatepassdetails" >'; // Set width to 100% to occupy the entire width of the screen
echo '<tr>';
echo '<th>GATEPASS NO.</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_id . '</td>'; // Align to the right

echo '<th>PRINTED DATE:</th>'; // Align to the left
echo '<td>' . date('Y-m-d H:i:s') . '</td>'; // Align to the left
echo '</tr>';
echo '<br>';

echo '<tr>';
echo '<th>NAME:</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_name . '</td>'; // Align to the right

echo '<th>VEHICLE REG:</th>'; // Align to the left
echo '<td>' . $gatepass->mgr_gtpgatepass_vehiclereg . '</td>'; // Align to the left
echo '</tr>';

echo '<br>';

echo '<tr>';
echo '<th>COMPANY:</th>'; // Align to the right
echo '<td>' . $gatepass->department->company->mgr_gtpcompanies_name . '</td>'; // Align to the right

echo '<th>DEPARTMENT:</th>'; // Align to the left
echo '<td>' . $gatepass->department->mgr_gtpdepartments_name . '</td>'; // Align to the left
echo '</tr>';
echo '<br>';

echo '<tr>';
echo '<th ">SOURCE LOCATION:</th>'; // Align to the right
echo '<td ">' . $gatepass->source_location->mgr_gtplocations_name . '</td>'; // Align to the right

echo '<th ">DESTINATION LOCATION:</th>'; // Align to the left
echo '<td ">' . $gatepass->destination_location->mgr_gtplocations_name . '</td>'; // Align to the left

echo '</tr>';
echo '<br>';

echo '<tr>';
echo '<th>SPECIFIC DESTINATION:</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_destination . '</td>'; // Align to the right
echo '<th>AUXILARY DOCUMENT:</th>'; // Align to the left
echo '<td>' .  $gatepass->mgr_gtpgatepass_auxilarydoc . '</td>'; // Align to the left

echo '</tr>';

echo '<br>';

echo '<tr>';
echo '<th>PURPOSE:</th>'; // Align to the right
echo '<td>' . $gatepass->mgr_gtpgatepass_purpose . '</td>'; // Align to the right

echo '<th> </th>'; // Align to the left
echo '<td> </td>'; // Align to the left
echo '</tr>';

echo '</table>';

//skip line after table
echo '<br>';

//return items in gatepass table as a table
echo '<h1> ITEMS: </h1>';
//echo '<br>';
echo '<table class="items">';
echo '<br>';
echo '<tr>
    <th  style="border: 1px solid #ddd; padding: 8px; text-align: left;">DESCRIPTION</th>
   
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">CODE</th>
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">QUANTITY</th>
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
    echo '<th>' . $approval->approvallevel->mgr_gtpapprovallevels_label .  '</th>';
    echo '<td>' . $approval->user->mgr_gtpusers_fname . ' ' . $approval->user->mgr_gtpusers_lname . '</td>';
    echo '<th> On </th>';
    echo '<td>' . $approval->created_at . '</td>';


    echo '</tr>';
}



echo '</table>';
//close div 
echo '</div>';
