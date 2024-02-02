<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gatepass Rejected</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }

        p {
            font-size: 16px;
        }

        h1 {
            font-size: 16px;
        }

        a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <h1>Dear Sir/Madam,</h1>
    <p>Your gatepass request has been rejected</p>
    <p>
        Please follow this link to view:
        <a href="{{route('gatepass.show',$gatepass->mgr_gtpgatepass_id)}}">Rejected Gatepass </a>
    </p>
    <p>Best regards,<br>Bulkstream Ltd.</p>
</body>

</html>