<?php

namespace App\Command;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Service\ChatService;

class WebSocketServerCommand extends Command
{
    protected static $defaultName = 'app:websocket-server';

    protected function configure()
    {
        $this->setDescription('Starts the WebSocket server for the chat');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $chatService = new ChatService();
        $server = IoServer::factory(
            new HttpServer(
                new WsServer($chatService)
            ),
            8080
        );

        $output->writeln('WebSocket server started on port 8080.');
        $server->run();
    }
}