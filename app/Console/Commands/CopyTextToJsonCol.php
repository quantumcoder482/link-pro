<?php

namespace App\Console\Commands;

use App\Models\CourseSection;
use Illuminate\Console\Command;

class CopyTextToJsonCol extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:CopyTextToJsonCol';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reformat text column to json and save to json column';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sections = CourseSection::whereNotNull('text')->get();

        foreach ($sections as $section) {

            $text = [
                        "type" => "doc",
                        "content" => [
                            [
                                "type"=> "paragraph",
                                "attrs"=> [
                                    "textAlign"=> "left"
                                ],
                                "content"=> [
                                    [
                                        "text"=> $section->text,
                                        "type"=> "text"
                                    ]
                                ]
                            ]
                        ]
                    ];
            $section->update(['section_text' => $text]);
        }

    }
}
