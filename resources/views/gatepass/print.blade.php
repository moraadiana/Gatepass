<?php
echo '<div class="gatepass-print">';
echo '<h1>Gatepass</h1>';

echo '<p>Gatepass Number: ' . $gatepass->mgr_gtpgatepass_id . '</p>';
echo '<p>Printed Date: ' . date('Y-m-d H:i:s') .'</p>';
echo '<p>Name: ' . $gatepass->mgr_gtpgatepass_name . '</p>';
echo '<p>Vehicle Reg: ' . $gatepass->mgr_gtpgatepass_vehiclereg . '</p>';
echo '<p>Company: ' . $gatepass->department->company->mgr_gtpcompanies_name . '</p>';
echo '<p>Department: ' . $gatepass->department->mgr_gtpdepartments_name . '</p>';
echo '<p>Source Location: ' . $gatepass->source_location->mgr_gtplocations_name . '</p>';
echo '<p>Destination Location: ' . $gatepass->destination_location->mgr_gtplocations_name . '</p>';
echo '<p>Specific Destination: ' . $gatepass->mgr_gtpgatepass_destination . '</p>';
echo '<p>Auxilary Document: ' .  $gatepass->mgr_gtpgatepass_auxilarydoc. '</p>';
echo '</div>';

//return items in gatepass table as a table
echo 'Items';
echo '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">';
echo '<tr>
    <th  style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
   
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code</th>
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">UOM</th>
    </tr>';
foreach ($gatepass->items as $item) {
   echo '<tr>';
   echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_description. '</td>';
   echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_code. '</td>';
   echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->mgr_gtpitems_quantity . '</td>';
   echo '<td style="border: 1px solid #ddd; padding: 8px;">' . $item->uom->mgr_gtpuoms_name. '</td>';
   echo '</tr>';
}

echo '</table>';
?>