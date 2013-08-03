package de.sveri.funcoding.comet

import _root_.net.liftweb._
import http._
import actor._


// register this class somehow with the url /editor/editor as a websocket/comet listener
object EditoServer extends LiftActor with ListenerManager {
  var history: String = ""

  override def lowPriority = {
    case EditorMessage(msg) => {
      history += msg
      updateListeners(msg)
    }
    case _ =>
  }

  def createUpdate = history
}

case class EditorMessage(message: String)
