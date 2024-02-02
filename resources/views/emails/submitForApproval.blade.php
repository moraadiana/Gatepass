<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gatepass Approval Request</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }

        h1 {
            font-size: 16px;
        }

        p {
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
    <p>You have received a gatepass request for approval. Please review the details and take necessary action.</p>
    <p>
        To approve or reject the request, please follow this link:
        <a href="{{route('gatepass.show',$gatepass->mgr_gtpgatepass_id)}}">Gatepass Approval </a>
    </p>
    <p>Thank you for your prompt attention to this matter.</p>
    <p>Best regards,<br>Bulkstream Ltd.</p>
</body>

</html>