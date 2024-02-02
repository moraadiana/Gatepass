<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GatepassApproved extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $gatepass;

    public function __construct($gatepass)
    {
        $this->gatepass = $gatepass;
    }

    /**
     * Create a new message instance.
     */
    public function build()
    {
        return $this->from('ictsupport@bulkstream.com')
            ->subject('Gatepass Approved')
            ->view('emails.GatepassApproved', ['gatepass' => $this->gatepass]);
    }
}
