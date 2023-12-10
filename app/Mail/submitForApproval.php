<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class submitForApproval extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
   public function build()
    {
        return $this->from ('diana.moraa@grainbulk.com')
        ->subject('Gatepass Approval Request')
        ->view('emails.submitForApproval');
         
    }
    // public function __construct()
    // {
    //     //
    // }

    /**
     * Get the message envelope.
      */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Submit For Approval',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content()
    // //Content
    // {
    //     // return new Content(
    //     //     view: 'emails.submitForApproval',
    //     // );
    //     return $this->view('emails.submitForApproval');
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    // public function attachments(): array
    // {
    //     return [];
    // }
}
