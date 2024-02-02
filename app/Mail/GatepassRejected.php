<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GatepassRejected extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $gatepass;

    /**
     * Create a new message instance.
     */

    public function __construct($gatepass)
    {
        $this->gatepass = $gatepass;
    }


    public function build()
    {
        return $this->from('ictsupport@bulkstream.com')
            ->subject('Gatepass Rejected')
            ->view('emails.GatepassRejected', ['gatepass' => $this->gatepass]);
    }
}
