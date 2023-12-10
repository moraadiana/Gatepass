<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GatepassRejected extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->from ('diana.moraa@grainbulk.com')
        ->subject('Gatepass Rejected')
        ->view('emails.GatepassRejected');
         
    }
}
